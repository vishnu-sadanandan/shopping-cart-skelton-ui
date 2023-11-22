function findRectangleDimensions(objects) {
    if (objects.length === 0) {
        return { width: 0, height: 0 };
    }

    let minX = objects[0].x;
    let minY = objects[0].y;
    let maxX = objects[0].x + objects[0].width;
    let maxY = objects[0].y + objects[0].height;

    for (let i = 1; i < objects.length; i++) {
        minX = Math.min(minX, objects[i].x);
        minY = Math.min(minY, objects[i].y);
        maxX = Math.max(maxX, objects[i].x + objects[i].width);
        maxY = Math.max(maxY, objects[i].y + objects[i].height);
    }

    const width = maxX - minX;
    const height = maxY - minY;

    return { width, height };
}

// Example usage:
const objects = [
    { height: 10, width: 20, x: 5, y: 15 },
    { height: 8, width: 15, x: 10, y: 10 },
    // Add more objects as needed
];

const dimensions = findRectangleDimensions(objects);
console.log(dimensions);