package com.inmar.sku.repository;

import com.inmar.sku.domain.Sku;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Sku entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkuRepository extends JpaRepository<Sku, Long> {

}
