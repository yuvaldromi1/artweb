import { HighlightOff, Send } from "@mui/icons-material";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField } from "@mui/material";
import "./ContactUs.css";

export function ContactUs() {
    return (
        <div className="ContactUs">

            <form>

                <TextField label="Full name" fullWidth className="spacing" />

                <TextField label="Email" type="email" fullWidth className="spacing" />

                <TextField label="Phone" type="tel" fullWidth className="spacing" />

                <TextField label="Message" fullWidth multiline rows={3} className="spacing" />

                <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />

                <ButtonGroup fullWidth variant="contained">
                    <Button color="primary">Send &nbsp; <Send /> </Button>
                    <Button color="secondary" type="reset">Clear &nbsp; <HighlightOff /> </Button>
                </ButtonGroup>

            </form>

        </div>
    );
}
