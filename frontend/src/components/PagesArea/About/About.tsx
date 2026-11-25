import { useTitle } from "../../../Utils/UseTitle";
import "./About.css";

function About() {

    useTitle("About");
    
    return (
        <div className="About">

			<p></p>

        </div>
    );
}

// Must expose this component as default because of the Lazy Loading: 
export default About;
