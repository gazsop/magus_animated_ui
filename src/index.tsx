import { render, h } from "preact";
import "./index.css";
import App from "./app";
console.log("Hello from preact");

render(<App />, document.getElementById("app") as HTMLElement);
