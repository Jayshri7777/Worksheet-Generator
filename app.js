document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("worksheet-form");
    const topicInput = document.getElementById("topic");
    const subtopicDatalist = document.getElementById("subtopics"); 
    const subtopicInput = document.getElementById("subtopic"); 
    const loader = document.getElementById("loader");
    const generateBtn = document.getElementById("generate-btn");

    const subtopicMap = {
        "Algebra": ["Linear Equations", "Quadratic Equations", "Polynomials", "Inequalities", "Exponents", "Logarithms"],
        "Geometry": ["Circles", "Triangles", "Quadrilaterals", "Lines and Angles", "Solid Geometry", "Coordinate Geometry"],
        "Trigonometry": ["Trigonometric Ratios", "Identities", "Heights and Distances", "Inverse Trigonometry"],
        "Calculus": ["Limits and Continuity", "Derivatives", "Integration", "Differential Equations"],
        "Arithmetic": ["Percentages", "Ratios and Proportions", "Simple Interest", "Compound Interest", "Profit and Loss", "Time and Work"]
    };

    topicInput.addEventListener("input", () => {
        const selectedTopic = topicInput.value;
        const subtopics = subtopicMap[selectedTopic] || []; 
        
        subtopicDatalist.innerHTML = "";
        
        subtopics.forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            subtopicDatalist.appendChild(option);
        });
        
    });


    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        
        if(loader) loader.style.display = "flex";
        if(generateBtn) {
            generateBtn.disabled = true;
            generateBtn.innerText = "Generating..";
        }

        const formData = new FormData(form);
        const data = {
            grade: formData.get("grade"),
            board: formData.get("board"),
            topic: formData.get("topic"),
            subtopic: formData.get("subtopic"),
            difficulty: formData.get("difficulty"),
            format: formData.get("format"),
            answer_key: document.getElementById("answer-key").checked 
        };

        console.log("Sending data to server:", data);
        
        try {
            const response = await fetch("/generate-worksheet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.error || `Server error: ${response.statusText}`);
            }
            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `worksheet.${data.format}`; 
            
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url); 
            a.remove();

        } catch (error) {
            console.error("Failed to generate worksheet:", error);
            alert(`Error: ${error.message}. Check the console for details.`);
        } finally {
            if(loader) loader.style.display = "none";
             if(generateBtn) {
                generateBtn.disabled = false;
                generateBtn.innerText = "Generate Worksheet";
            }
        }
    });
});

