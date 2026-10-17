param(
  [string]$BaseUrl = "https://exam-studio-premium-test.kreates15.workers.dev"
)

$ErrorActionPreference = "Stop"
$base = $BaseUrl.TrimEnd('/')
$checks = [System.Collections.Generic.List[string]]::new()

function Assert-Check([bool]$Condition, [string]$Name) {
  if (-not $Condition) { throw "FAILED: $Name" }
  $checks.Add($Name)
}

$health = Invoke-RestMethod "$base/health"
Assert-Check ($health.ok -and $health.database -eq 'connected') 'Worker and D1 health'

$plans = Invoke-RestMethod "$base/api/plans"
Assert-Check ($plans.plans.Count -eq 2) 'Free and Premium plan lookup'

$question = Invoke-RestMethod "$base/api/question"
Assert-Check ($question.question.id -eq 'ce-statics-beam-001') 'Question lookup'
Assert-Check (-not $question.question.PSObject.Properties['correctAnswer']) 'Question response hides answer'

$grade = Invoke-RestMethod -Uri "$base/api/grade" -Method Post -ContentType 'application/json' -Body '{"questionId":"ce-statics-beam-001","answer":"A"}'
Assert-Check ($grade.correct -and $grade.correctAnswer -eq 'A') 'D1 answer grading'

$freeGate = Invoke-RestMethod -Uri "$base/api/premium/solution" -Method Post -ContentType 'application/json' -Body '{"questionId":"ce-statics-beam-001"}'
Assert-Check (-not $freeGate.allowed -and $freeGate.status -eq 'upgrade_required') 'Free tier blocks worked solution'
Assert-Check ($freeGate.checkoutUrl -like 'https://sandbox-api.polar.sh/*') 'Free tier returns Polar Sandbox link'
Assert-Check (-not $freeGate.paymentVerified) 'Free gate does not claim payment verification'

$simulated = Invoke-RestMethod -Uri "$base/api/premium/solution" -Method Post -ContentType 'application/json' -Body '{"questionId":"ce-statics-beam-001","mode":"premium_test"}'
Assert-Check ($simulated.allowed -and $simulated.simulated -and -not $simulated.paymentVerified) 'Premium test mode is labeled simulated'
Assert-Check ([bool]$simulated.workedSolution) 'Premium test solution lookup'

"Passed $($checks.Count) smoke checks:"
$checks | ForEach-Object { "- $_" }
