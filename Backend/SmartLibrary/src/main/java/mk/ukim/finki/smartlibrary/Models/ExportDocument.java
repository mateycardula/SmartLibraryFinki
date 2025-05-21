package mk.ukim.finki.smartlibrary.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import mk.ukim.finki.smartlibrary.Enums.FileType;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "exported_documents")
public class ExportDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Enumerated(EnumType.STRING)
    private FileType fileType;

    @Column(nullable = false)
    private String filePath;

    @Temporal(TemporalType.TIMESTAMP)
    private Date exportedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonManagedReference
    private User user;

    @OneToMany(mappedBy = "exportedDocument", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<GeneratedContent> contents;

    // Getters & Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }

    public void setFileName(String fileName) { this.fileName = fileName; }

    public FileType getFileType() { return fileType; }

    public void setFileType(FileType fileType) { this.fileType = fileType; }

    public String getFilePath() { return filePath; }

    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Date getExportedAt() { return exportedAt; }

    public void setExportedAt(Date exportedAt) { this.exportedAt = exportedAt; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public List<GeneratedContent> getContents() { return contents; }

    public void setContents(List<GeneratedContent> contents) { this.contents = contents; }
}
