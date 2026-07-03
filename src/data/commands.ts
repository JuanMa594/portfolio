export const commands = {
  help: {
    description: "Available commands",
    action: () => "Commands: /help, /about, /projects, /skills, /contact, /pixel",
  },
  about: {
    description: "Go 'About me' section",
    action: () => "about",
  },
  projects: {
    description: "Go to projects section",
    action: () => "projects",
  },
  pixel: {
    description: "Switch an animation to the logo",
    action: () => "pixel",
  },
};