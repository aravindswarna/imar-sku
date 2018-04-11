package com.inmar.sku.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Sku.
 */
@Entity
@Table(name = "sku")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sku implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sku_desc")
    private String skuDesc;

    @OneToMany(mappedBy = "sku",fetch = FetchType.EAGER)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkuDesc() {
        return skuDesc;
    }

    public Sku skuDesc(String skuDesc) {
        this.skuDesc = skuDesc;
        return this;
    }

    public void setSkuDesc(String skuDesc) {
        this.skuDesc = skuDesc;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Sku locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Sku addLocation(Location location) {
        this.locations.add(location);
        location.setSku(this);
        return this;
    }

    public Sku removeLocation(Location location) {
        this.locations.remove(location);
        location.setSku(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Sku sku = (Sku) o;
        if (sku.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sku.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sku{" +
            "id=" + getId() +
            ", skuDesc='" + getSkuDesc() + "'" +
            "}";
    }
}
