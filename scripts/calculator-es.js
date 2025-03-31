let currentStep = 0;
document.getElementById('step1').style.display = 'block';

function nextStep(step) {
    document.getElementById(`step${step}`).style.display = 'none';
    document.getElementById(`step${step + 1}`).style.display = 'block';
}

function calculateCost() {
    let repairType = document.querySelector('input[name="repair_type"]:checked');
    let area = parseFloat(document.getElementById("area").value);
    let materialQuality = document.querySelector('input[name="material_quality"]:checked');
    let extras = [...document.querySelectorAll('input[name="extra"]:checked')].reduce((sum, el) => sum + parseFloat(el.value), 0);
    let admin = [...document.querySelectorAll('input[name="admin"]:checked')].reduce((sum, el) => sum + parseFloat(el.value), 0);

    if (!repairType || !materialQuality || isNaN(area) || area <= 0) {
        alert("Будь ласка, заповніть всі поля коректно.");
        return;
    }

    let basePrice = parseFloat(repairType.value);
    let qualityMultiplier = parseFloat(materialQuality.value);
    let totalCost = (area * basePrice) * qualityMultiplier + extras + admin;

    document.getElementById("cost").textContent = totalCost.toFixed(2);
}