require("@testing-library/jest-dom");

// Mock scrollIntoView for all elements
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock HTMLMediaElement play and pause for JSDOM
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();
