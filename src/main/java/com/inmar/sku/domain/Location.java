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
 * A Location.
 */
@Entity
@Table(name = "location")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "location_name")
    private String locationName;

    @OneToMany(mappedBy = "location",fetch = FetchType.EAGER)
    private Set<Department> departments = new HashSet<>();

    @ManyToOne
    private Sku sku;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocationName() {
        return locationName;
    }

    public Location locationName(String locationName) {
        this.locationName = locationName;
        return this;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Set<Department> getDepartments() {
        return departments;
    }

    public Location departments(Set<Department> departments) {
        this.departments = departments;
        return this;
    }

    public Location addDepartment(Department department) {
        this.departments.add(department);
        department.setLocation(this);
        return this;
    }

    public Location removeDepartment(Department department) {
        this.departments.remove(department);
        department.setLocation(null);
        return this;
    }

    public void setDepartments(Set<Department> departments) {
        this.departments = departments;
    }

    public Sku getSku() {
        return sku;
    }

    public Location sku(Sku sku) {
        this.sku = sku;
        return this;
    }

    public void setSku(Sku sku) {
        this.sku = sku;
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
        Location location = (Location) o;
        if (location.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), location.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", locationName='" + getLocationName() + "'" +
            "}";
    }
}
