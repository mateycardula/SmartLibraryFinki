package mk.ukim.finki.smartlibrary.Controllers;

import mk.ukim.finki.smartlibrary.DTOs.UserLoginDTO;
import mk.ukim.finki.smartlibrary.Models.User;
import mk.ukim.finki.smartlibrary.DTOs.LoginUserDTO;
import mk.ukim.finki.smartlibrary.DTOs.RegisterUserDTO;
import mk.ukim.finki.smartlibrary.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserLoginDTO> getAllUsers() {
        return userService.findAll().stream()
                .map(user -> new UserLoginDTO(user.getId(), user.getEmail(), user.getName()))
                .toList();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/email/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/register")
    public ResponseEntity<UserLoginDTO> register(@RequestBody RegisterUserDTO userDto) {
        User user = userService.create(userDto);
        UserLoginDTO response = new UserLoginDTO(user.getId(), user.getEmail(), user.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginUserDTO loginDTO) {
        Optional<User> userOpt = userService.login(loginDTO);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        User user = userOpt.get();
        UserLoginDTO dto = new UserLoginDTO(user.getId(), user.getEmail(), user.getName());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public Optional<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        return userService.delete(id);
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<?> getUserDocumentStats(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> {
                    long uploadCount = user.getUploadDocuments() != null ? user.getUploadDocuments().size() : 0;
                    long exportCount = user.getExprtedDocuments() != null ? user.getExprtedDocuments().size() : 0;

                    return ResponseEntity.ok(Map.of(
                            "uploadCount", uploadCount,
                            "exportCount", exportCount
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
