function detectCollision(sprite1, sprite2) {
    var sprite1X1 = sprite1.position.x - sprite1.anchor.x * sprite1.width;
    var sprite1X2 = sprite1.position.x + (1 - sprite1.anchor.x) * sprite1.width;
    var sprite1Y1 = sprite1.position.y - sprite1.anchor.y * sprite1.height;
    var sprite1Y2 = sprite1.position.y + (1 - sprite1.anchor.y) * sprite1.height;

    var sprite2X1 = sprite2.position.x - sprite2.anchor.x * sprite2.width;
    var sprite2X2 = sprite2.position.x + (1 - sprite2.anchor.x) * sprite2.width;
    var sprite2Y1 = sprite2.position.y - sprite2.anchor.y * sprite2.height;
    var sprite2Y2 = sprite2.position.y + (1 - sprite2.anchor.y) * sprite2.height;

    return ((sprite1X1 <= sprite2X2 && sprite1X1 >= sprite2X1) ||
            (sprite1X2 <= sprite2X2 && sprite1X2 >= sprite2X1)) 
                                    &&
           ((sprite1Y1 <= sprite2Y2 && sprite1Y2 >= sprite2Y1) ||
            (sprite1Y2 <= sprite2Y2 && sprite1Y2 >= sprite2Y2));
}

function detectCollisionFireBall(sprite1, sprite2) {
   
    var sprite1X1 = (sprite1.position.x - sprite1.anchor.x * sprite1.width/6);
    var sprite1X2 = (sprite1.position.x + (1 - sprite1.anchor.x) * sprite1.width/6);
    var sprite1Y1 = sprite1.position.y - sprite1.anchor.y * sprite1.height/15;
    var sprite1Y2 = sprite1.position.y + (1 - sprite1.anchor.y) * sprite1.height/15;

    var sprite2X1 = sprite2.position.x - sprite2.anchor.x * sprite2.width;
    var sprite2X2 = sprite2.position.x + (1 - sprite2.anchor.x) * sprite2.width;
    var sprite2Y1 = sprite2.position.y - sprite2.anchor.y * sprite2.height;
    var sprite2Y2 = sprite2.position.y + (1 - sprite2.anchor.y) * sprite2.height;

    return ((sprite1X1 <= sprite2X2 && sprite1X1 >= sprite2X1) ||
            (sprite1X2 <= sprite2X2 && sprite1X2 >= sprite2X1)) 
                                    &&
           ((sprite1Y1 <= sprite2Y2 && sprite1Y2 >= sprite2Y1) ||
            (sprite1Y2 <= sprite2Y2 && sprite1Y2 >= sprite2Y2));
}
function getTopLeft(sprite) {
    return new PIXI.Point(sprite.position.x - sprite.anchor.x * sprite.width,
            sprite.position.y - sprite.anchor.y * sprite.height);
}

function getBottomRight(sprite) {
    return new PIXI.Point(sprite.position.x + (1 - sprite.anchor.x) * sprite.width,
            sprite.position.y + (1 - sprite.anchor.y) * sprite.height);
}

function getCenter(sprite) {
    var topLeft = getTopLeft(sprite);
    return new PIXI.Point(topLeft.x + 0.5 * sprite.width,
            topLeft.y + 0.5 * sprite.height);
}