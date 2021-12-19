package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}