package mk.ukim.finki.smartlibrary.Service;

import mk.ukim.finki.smartlibrary.Models.User;
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

    public User create(User u) {
        return repo.save(u);
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
