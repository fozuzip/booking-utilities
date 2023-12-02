import r2wc from "@r2wc/react-to-web-component";

import { Greeting } from "./Greeting.tsx";
import "./index.css";

const WebGreeting = r2wc(Greeting);

customElements.define("web-greeting", WebGreeting);
