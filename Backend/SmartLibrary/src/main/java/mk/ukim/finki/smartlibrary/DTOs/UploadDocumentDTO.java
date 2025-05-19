package mk.ukim.finki.smartlibrary.DTOs;

import java.io.File;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadDocumentDTO {
  private Long categoryId;
  private MultipartFile file;
  private Long userId;
  private String description;
}