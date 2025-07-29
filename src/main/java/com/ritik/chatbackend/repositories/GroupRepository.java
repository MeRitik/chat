package com.ritik.chatbackend.repositories;

import com.ritik.chatbackend.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
    boolean findByName(String name);
}
