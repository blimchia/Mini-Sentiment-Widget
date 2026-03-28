# Mini Sentiment Widget

A lightweight React frontend application that implements a simple sentiment feedback widget. Users can select a rating, leave a comment, and view a summary of recent submissions.

## 🚀 Instructions for Running Locally

To get this project up and running on your local machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Setup
1. **Clone the repository** (or extract the project folder):
   ```bash
   git clone <your-github-repo-url>
   cd Mini-Sentiment-Widget
   ```
2. Install dependencies:
    ```bash
    npm run dev
    ```
3. Open the application:
Open your browser and navigate to the local URL provided in your terminal (usually http://localhost:5173)

### Architectural & Design Decisions
In building this widget, several technical decisions were made to prioritize clean, readable, and maintainable code:

**Build Tool & Framework**: The project is built using React 18+ with Vite. Vite was chosen over Create React App for its significantly faster cold starts, instant hot module replacement (HMR), and highly optimized build process.

**Component Structure**: The UI is broken down into small, focused functional components (RatingChips, CommentBox, SubmitButton, and SummaryPanel). This keeps the main App.jsx file clean and makes each piece of the UI independently testable and reusable.

**State Management**: Since the requirement specified no backend implementation, all application state (current rating, comment text, and the history of submissions) is managed locally using React's useState hook.

**Styling**: Standard inline styles were used to keep the components self-contained and simple, ensuring all functional requirements are met without the overhead of external CSS libraries or frameworks.

**Spam Prevention**: A simple 3-second lock-out mechanism is implemented using setTimeout within the submission handler to disable the form inputs temporarily after a successful submission.