package mk.ukim.finki.smartlibrary.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DocumentSummaryDTO {
    private Long id;
    private String fileName;
    private String description;
    private String fileType;
    private Date uploadedDate;
    private List<String> categoryNames;
}
