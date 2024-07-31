function parseData(data) {
    const lines = data.trim().split("\n");
    const points = lines.map(line => {
        const [x, y] = line.split(",").map(Number);
        return { x, y };
    });
    return points;
}

function calculateLinearRegression(data) {
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    const n = data.length;

    data.forEach(point => {
        sumX += point.x;
        sumY += point.y;
        sumXY += point.x * point.y;
        sumX2 += point.x * point.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}

function predictDemand() {
    const dataText = document.getElementById("data").value;
    const futureX = Number(document.getElementById("futureX").value);
    
    if (!dataText || isNaN(futureX)) {
        document.getElementById("result").innerText = "Please enter valid data and future time period.";
        return;
    }

    const data = parseData(dataText);
    const { slope, intercept } = calculateLinearRegression(data);
    const predictedY = slope * futureX + intercept;

    document.getElementById("result").innerText = `Predicted demand for period ${futureX} is ${predictedY.toFixed(2)}`;
}
