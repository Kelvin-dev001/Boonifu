export function drawWatermark(ctx, W, H) {
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.font = "bold 18px Inter";
  ctx.fillStyle = "#222";
  ctx.fillText("boonifu.com", W/2, H-8);
  ctx.restore();
}