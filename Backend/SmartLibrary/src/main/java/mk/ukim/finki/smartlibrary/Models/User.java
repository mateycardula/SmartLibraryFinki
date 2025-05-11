package mk.ukim.finki.smartlibrary.Models;

import jakarta.persistence.*;
import mk.ukim.finki.smartlibrary.Enums.Role;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UploadDocument> uploadDocuments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ExportDocument> exportedDocuments;

    public User() {
    }

    public User(String name, String email, String passwordHash) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        role = Role.STUDENT; // Default role
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public List<UploadDocument> getUploadDocuments() { return uploadDocuments; }
    public void setUploadDocuments(List<UploadDocument> uploadDocuments) { this.uploadDocuments = uploadDocuments; }
}
