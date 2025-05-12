package mk.ukim.finki.smartlibrary.Service;

import org.springframework.security.crypto.bcrypt.BCrypt;
import mk.ukim.finki.smartlibrary.Models.User;
import mk.ukim.finki.smartlibrary.DTOs.*;
import mk.ukim.finki.smartlibrary.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> findAll() {
        return repo.findAll();
    }

    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(repo.findByEmail(email));
    }

    public User create(RegisterUserDTO u) {
        String plainPassword = u.getPassword();
        String hashedPassword = BCrypt.hashpw(plainPassword, BCrypt.gensalt());
        User user = new User(u.getName(), u.getEmail(), hashedPassword);
        return repo.save(user);
    }

    public Optional<User> login(LoginUserDTO loginDTO) {
        User user = repo.findByEmail(loginDTO.getEmail());
        if (user != null && BCrypt.checkpw(loginDTO.getPassword(), user.getPasswordHash())) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public Optional<User> update(Long id, User in) {
        return repo.findById(id).map(existing -> {
            existing.setName(in.getName());
            existing.setEmail(in.getEmail());
            existing.setPasswordHash(in.getPasswordHash());
            existing.setRole(in.getRole());
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
