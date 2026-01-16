# DC Results - Exam Result Processing & Viewer

This repository contains tools for scraping, processing, and displaying academic results for Dhaka College students (specifically 1st Year HSC - Science). It includes both the backend-style scraping scripts and a frontend web interface for viewing the results.

## 📂 Project Structure

-   **`scrap-main.js`**: A Node.js/browser-compatible script used to fetch result transcripts from the college website. It handles PDF data extraction and processes individual student marks.
-   **`main.js`**: Core logic for processing the raw data, calculating statistics (GPA, grades, pass/fail status), and rendering the result tables.
-   **`year-final-result/`**: The web interface for the Year Final Exam results.
    -   **`index.html`**: The main dashboard for viewing results.
    -   **`assets/`**: Contains the necessary CSS (`year-final-result.css`), JS (`year-final-result.js`), and JSON data (`year-final-result.json`).

## 🚀 Features

### for Result Viewer (`year-final-result/`)
-   **Searchable Database**: Quickly find students by Name or Roll Number.
-   **Detailed Marksheets**: View breakdown of marks for all subjects (Bangla, English, Physics, Chemistry, etc.).
-   **Automated Statistics**:
    -   **GPA & Merit**: Automatic calculation of GPA and Merit Position.
    -   **Subject Stats**: Pass rates and grade distribution (A+, A, F, etc.) per subject.
    -   **Section Comparison**: Compare performance across different sections (A-H).
-   **Transcript Link**: Direct access to the original result PDF/transcript.

### Result Processing
-   **PDF Parsing**: Extracts text and result data directly from result PDFs using `pdf.js`.
-   **Aggregation**: Compiles individual results into a structured JSON format for the frontend.

## 🛠️ Usage

### Viewing Results
1.  Navigate to the `year-final-result/` directory.
2.  Open `index.html` in a web browser.
3.  Use the search input to filter results.
4.  Scroll down to see comprehensive batch statistics and section-wise breakdowns.

### Data Extraction (Dev Usage)
The `scrap-main.js` script is designed to:
1.  Iterate through a range of roll numbers.
2.  Fetch result pages/PDFs from the college portal.
3.  Parse the visual positioning of text in PDFs to separate marks and grades.
4.  Generate a JSON dataset (which populates `year-final-result/assets/json/year-final-result.json`).

## 🤝 Credits

Developed by **Nazmul Alom Shanto**.