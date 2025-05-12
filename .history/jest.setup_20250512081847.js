require("@testing-library/jest-dom");

// Mock scrollIntoView for all elements
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock HTMLMediaElement play and pause for JSDOM
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();

// Mock IntersectionObserver for Framer Motion and other libraries
class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverMock;

if (
  typeof window !== "undefined" &&
  typeof window.PointerEvent === "undefined"
) {
  window.PointerEvent = function () {};
}
