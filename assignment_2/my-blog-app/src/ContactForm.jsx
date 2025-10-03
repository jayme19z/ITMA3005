import React, { useState } from "react";

function ContactForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [request, setRequest] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !request) {
            alert("Please fill all fields!");
            return;
        }

        console.log("Form submitted:", { name, phone, request });

        setSubmitted(true);
    };

    return (
        <section className="contact">
            <h1 className="heading">
                <span>Contact</span> Me
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="inputBox">
                    <input
                        type="tel"
                        placeholder="Your Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="inputBox">
                    <textarea
                        placeholder="Your Request"
                        rows="5"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        required
                    ></textarea>
                </div>

                <input
                    type="submit"
                    value={submitted ? "Sent" : "Submit"}
                    className="btn"
                    style={{
                        backgroundColor: submitted ? "green" : "#4f46e5",
                        color: "white",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                />
            </form>
        </section>
    );
}

export default ContactForm;