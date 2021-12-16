package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private Integer name;

    public Role() {
    }

    public Role(Integer id, Integer name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public Integer getName() {
        return name;
    }
}