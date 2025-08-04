package com.ritik.chatbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private AppUser sender;

    @ManyToOne
    private Group group;
    private String message;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant timestamp;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Message message1 = (Message) o;
        return Objects.equals(id, message1.id) && Objects.equals(sender, message1.sender) && Objects.equals(group, message1.group) && Objects.equals(message, message1.message) && Objects.equals(timestamp, message1.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sender, group, message, timestamp);
    }
}
