package mk.ukim.finki.smartlibrary.Controllers;

import mk.ukim.finki.smartlibrary.Models.User;
import mk.ukim.finki.smartlibrary.DTOs.LoginUserDTO;
import mk.ukim.finki.smartlibrary.DTOs.RegisterUserDTO;
import mk.ukim.finki.smartlibrary.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
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
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody  RegisterUserDTO user) {
        return userService.create(user);
    }

    @PostMapping("/login")
    public Optional<User> loginUser(@RequestBody LoginUserDTO loginDTO) {
        return userService.login(loginDTO);
    }

    @PutMapping("/{id}")
    public Optional<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        return userService.delete(id);
    }
}
