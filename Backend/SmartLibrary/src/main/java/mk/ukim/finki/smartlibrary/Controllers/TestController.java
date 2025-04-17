package mk.ukim.finki.smartlibrary.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final RestTemplate restTemplate;

    public TestController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping
    public String getTestMessage() {
        return "Hello, this is a test message!";
    }

    @GetMapping
    @RequestMapping("/python")
    public String getPythonTestMessage() {
        String url = "http://flask:5000";
        return restTemplate.getForObject(url, String.class);
    }
}