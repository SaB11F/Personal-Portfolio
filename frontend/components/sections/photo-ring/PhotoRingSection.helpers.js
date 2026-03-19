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
      cardWidth: 396,
      cardHeight: 296,
      gap: 24,
      spill: 118,
      verticalPadding: 102,
    };
  }

  if (width >= 900) {
    return {
      cardWidth: 344,
      cardHeight: 258,
      gap: 20,
      spill: 82,
      verticalPadding: 90,
    };
  }

  return {
    cardWidth: 272,
    cardHeight: 204,
    gap: 14,
    spill: 34,
    verticalPadding: 62,
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
