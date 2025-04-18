package mk.ukim.finki.smartlibrary.Models;
import jakarta.persistence.*;
import java.util.Date;

import java.util.List;
@Entity
@Table(name = "exported_documents")
public class ExportDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;

    @Lob
    private byte[] fileContent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Date exportedAt;
    @OneToMany(mappedBy = "exportedDocument", cascade = CascadeType.ALL)
    private List<GeneratedContent> contents;



    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public byte[] getFileContent() { return fileContent; }
    public void setFileContent(byte[] fileContent) { this.fileContent = fileContent; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Date getExportedAt() { return exportedAt; }
    public void setExportedAt(Date exportedAt) { this.exportedAt = exportedAt; }

}
