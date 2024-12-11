# JSON and CSV Converter

## Overview
This React-based application simplifies the conversion of JSON files to CSV format and vice versa. It is specially designed for managing translation files, making it easier to generate CSV files that can be updated in tools like Google Sheets. Translators can conveniently update translations and then convert the CSV files back into JSON format for seamless application integration. With features like file preview, download, and clipboard copy, this tool ensures a smooth workflow for managing translation data.

## Features
- **JSON to CSV Conversion:** Flatten nested JSON translation files into CSV format for easier editing.
- **CSV to JSON Conversion:** Transform updated CSV files back into nested JSON structure.
- **Google Sheets Integration:** Generate translation files for easy import and export with Google Sheets.
- **File Handling:** Upload, preview, download, and copy converted files effortlessly.
- **Multi-language Support:** Supports handling translation keys for multiple languages (e.g., `en` and `fi`).

## Technologies Used
- **React:** Core framework for building the user interface.
- **Tailwind CSS:** Provides responsive and customizable styling for the application.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd your-repo-name
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

1. Launch the app in your browser at the provided local server address (e.g., `http://localhost:3000`).
2. **JSON to CSV Conversion:**
   - Upload a JSON file containing translation data.
   - Click **Convert to CSV** to generate a CSV file.
   - Preview, download, or copy the CSV output for use in tools like Google Sheets.
3. **CSV to JSON Conversion:**
   - Upload a CSV file containing updated translations.
   - Click **Convert to JSON** to generate a JSON file.
   - Preview, download, or copy the JSON output for integration into your application.

## File Format Requirements

### JSON to CSV
The JSON file should follow this structure:
```json
{
  "en": {
    "key1": "value1",
    "nested": {
      "key2": "value2"
    }
  },
  "fi": {
    "key1": "arvo1",
    "nested": {
      "key2": "arvo2"
    }
  }
}
```

### CSV to JSON
The CSV file should have this structure:
```csv
KEY,EN,FI
key1,value1,arvo1
nested.key2,value2,arvo2
```

## Project Structure
```
src/
├── app/
│   ├── page.js           # Main React component
├── styles/
│   └── globals.css       # Global styles
├── public/
│   └── ...               # Public assets
└── ...                   # Other configuration files
```

## Components
### `Home`
- **State Management:**
  - `jsonData`: Stores uploaded JSON data.
  - `csvData`: Stores uploaded CSV data.
  - `convertedJsonData`: Stores the JSON output converted from CSV.
- **Key Functions:**
  - `handleFileChange`: Handles JSON file upload.
  - `convertToCsv`: Converts JSON data to CSV format.
  - `handleCSVFileChange`: Handles CSV file upload.
  - `convertToJSON`: Converts CSV data to JSON format.
  - `downloadJSON`: Downloads the JSON output as a file.
  - `copyToClipboard`: Copies JSON data to clipboard.

## Deployment
To deploy the project:
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `build` directory to your hosting provider.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

