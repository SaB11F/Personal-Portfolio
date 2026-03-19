export function buildLoopItems(items, copies) {
  return Array.from({ length: copies }, (_, copyIndex) =>
    items.map((item) => ({
      ...item,
      loopKey: `${item.id}-${copyIndex}`,
    }))
  ).flat();
}

export function getRingMetrics(width) {
  if (width >= 1320) {
    return {
      cardWidth: 416,
      cardHeight: 312,
      gap: 24,
      spill: 126,
      verticalPadding: 72,
    };
  }

  if (width >= 900) {
    return {
      cardWidth: 360,
      cardHeight: 270,
      gap: 20,
      spill: 88,
      verticalPadding: 62,
    };
  }

  return {
    cardWidth: 288,
    cardHeight: 216,
      gap: 14,
    spill: 38,
    verticalPadding: 46,
  };
}

export function shouldCaptureHorizontalGesture(gestureState) {
  return (
    Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
    Math.abs(gestureState.dx) > 6
  );
}

export function wrapTrackPosition(value, anchor, loopSpan) {
  if (!loopSpan) {
    return value;
  }

  let wrappedValue = value;
  const minimum = anchor - loopSpan;
  const maximum = anchor + loopSpan;

  while (wrappedValue < minimum) {
    wrappedValue += loopSpan;
  }

  while (wrappedValue > maximum) {
    wrappedValue -= loopSpan;
  }

  return wrappedValue;
}
