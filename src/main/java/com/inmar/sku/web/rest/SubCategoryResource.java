package com.inmar.sku.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.inmar.sku.domain.SubCategory;

import com.inmar.sku.repository.SubCategoryRepository;
import com.inmar.sku.web.rest.errors.BadRequestAlertException;
import com.inmar.sku.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SubCategory.
 */
@RestController
@RequestMapping("/api")
public class SubCategoryResource {

    private final Logger log = LoggerFactory.getLogger(SubCategoryResource.class);

    private static final String ENTITY_NAME = "subCategory";

    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryResource(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    /**
     * POST  /sub-categories : Create a new subCategory.
     *
     * @param subCategory the subCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subCategory, or with status 400 (Bad Request) if the subCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-categories")
    @Timed
    public ResponseEntity<SubCategory> createSubCategory(@RequestBody SubCategory subCategory) throws URISyntaxException {
        log.debug("REST request to save SubCategory : {}", subCategory);
        if (subCategory.getId() != null) {
            throw new BadRequestAlertException("A new subCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubCategory result = subCategoryRepository.save(subCategory);
        return ResponseEntity.created(new URI("/api/sub-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-categories : Updates an existing subCategory.
     *
     * @param subCategory the subCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subCategory,
     * or with status 400 (Bad Request) if the subCategory is not valid,
     * or with status 500 (Internal Server Error) if the subCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-categories")
    @Timed
    public ResponseEntity<SubCategory> updateSubCategory(@RequestBody SubCategory subCategory) throws URISyntaxException {
        log.debug("REST request to update SubCategory : {}", subCategory);
        if (subCategory.getId() == null) {
            return createSubCategory(subCategory);
        }
        SubCategory result = subCategoryRepository.save(subCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-categories : get all the subCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subCategories in body
     */
    @GetMapping("/sub-categories")
    @Timed
    public List<SubCategory> getAllSubCategories() {
        log.debug("REST request to get all SubCategories");
        return subCategoryRepository.findAll();
        }

    /**
     * GET  /sub-categories/:id : get the "id" subCategory.
     *
     * @param id the id of the subCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subCategory, or with status 404 (Not Found)
     */
    @GetMapping("/sub-categories/{id}")
    @Timed
    public ResponseEntity<SubCategory> getSubCategory(@PathVariable Long id) {
        log.debug("REST request to get SubCategory : {}", id);
        SubCategory subCategory = subCategoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(subCategory));
    }

    /**
     * DELETE  /sub-categories/:id : delete the "id" subCategory.
     *
     * @param id the id of the subCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubCategory(@PathVariable Long id) {
        log.debug("REST request to delete SubCategory : {}", id);
        subCategoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
