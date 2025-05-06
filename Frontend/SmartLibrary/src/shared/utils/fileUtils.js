export function getFileType(file) {
    const fileName = typeof file === "string" ? file : file.name;
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
        case "pdf":
            return "pdf";
        case "docx":
            return "docx";
        case "txt":
            return "txt";
        case "csv":
            return "csv";
        default:
            return "unknown";
    }
}
