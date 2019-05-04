import animatedScroll from "animated-scroll-to";

export function scrollTo(container: Element, offset: number) {
  animatedScroll(offset, {
    element: container as any,
    horizontal: true,
    speed: 1050,
    minDuration: 350
  });
}
