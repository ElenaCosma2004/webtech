class Software {
  constructor(name) {
    this.name = name;
  }

  run() {
    console.log(`${this.name} is running`);
  }
}

class Plugin {
  constructor(name) {
    this.name = name;
  }

  activate() {
    console.log(`Plugin ${this.name} is activated`);
  }
}

class Browser extends Software {
  constructor(name) {
    super(name);
    this.plugins = [];
  }
  addPlugin(plugin) {
    this.plugins.push(plugin);
    console.log(`Added plugin: ${plugin.name}`);
  }
  installPlugins() {
    console.log(`Installing plugins for ${this.name}`);
    for (const plugin of this.plugins) {
      plugin.activate();
    }
  }
}

const chrome = new Browser("Chrome");
const adblock = new Plugin("AdBlock");
const darktheme = new Plugin("DarkTheme");

chrome.addPlugin(adblock);
chrome.addPlugin(darktheme);

chrome.run();
chrome.installPlugins();
