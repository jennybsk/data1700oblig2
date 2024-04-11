package com.example.data1700oblig2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class KinobillettController {
    public final List<Kinobillett> kinobillettRegister = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagre(Kinobillett kinobillett) {
        kinobillettRegister.add(kinobillett);
    }

    @GetMapping("/hentAlle")
    public List<Kinobillett> hentAlle() {
        return kinobillettRegister;
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        kinobillettRegister.clear();
    }
}
