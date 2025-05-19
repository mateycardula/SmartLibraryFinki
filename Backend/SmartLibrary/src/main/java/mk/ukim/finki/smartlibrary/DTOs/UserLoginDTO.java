package mk.ukim.finki.smartlibrary.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserLoginDTO {
    private Long id;
    private String email;
    private String fullName;
}
