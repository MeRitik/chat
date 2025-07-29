package com.ritik.chatbackend.repositories;

import com.ritik.chatbackend.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findByName(String name);
    boolean existsByName(String name);
}
