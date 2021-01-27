package com.Kelp2.kelp.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="aquarium")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aquarium {

    @Id
    @Column(name="aquarium_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aquariumID;

    @Column(name="photo")
    private String photo;

    @Column(name="name")
    private String name;

    @Column(name="phone")
    private String phone;

    @Column(name="url")
    private String url;

    @Column(name="street")
    private String street;

    @Column(name="city")
    private String city;

    @Column(name="postal_code")
    private String postalCode;

    @Column(name="description")
    private String description;

}
