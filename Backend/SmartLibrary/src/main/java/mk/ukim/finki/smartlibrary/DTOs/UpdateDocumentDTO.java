package mk.ukim.finki.smartlibrary.DTOs;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UpdateDocumentDTO {
    private String fileName;
    private String description;
    private String fileType;
    private boolean processed;
    private Date uploadedDate;
    private Long userId;
    private List<Long> categoryIds;
}

