package com.inmar.sku.web.rest;

import com.inmar.sku.StockkeepingunitApp;

import com.inmar.sku.domain.Sku;
import com.inmar.sku.repository.SkuRepository;
import com.inmar.sku.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.inmar.sku.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SkuResource REST controller.
 *
 * @see SkuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StockkeepingunitApp.class)
public class SkuResourceIntTest {

    private static final String DEFAULT_SKU_DESC = "AAAAAAAAAA";
    private static final String UPDATED_SKU_DESC = "BBBBBBBBBB";

    @Autowired
    private SkuRepository skuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSkuMockMvc;

    private Sku sku;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SkuResource skuResource = new SkuResource(skuRepository);
        this.restSkuMockMvc = MockMvcBuilders.standaloneSetup(skuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sku createEntity(EntityManager em) {
        Sku sku = new Sku()
            .skuDesc(DEFAULT_SKU_DESC);
        return sku;
    }

    @Before
    public void initTest() {
        sku = createEntity(em);
    }

    @Test
    @Transactional
    public void createSku() throws Exception {
        int databaseSizeBeforeCreate = skuRepository.findAll().size();

        // Create the Sku
        restSkuMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sku)))
            .andExpect(status().isCreated());

        // Validate the Sku in the database
        List<Sku> skuList = skuRepository.findAll();
        assertThat(skuList).hasSize(databaseSizeBeforeCreate + 1);
        Sku testSku = skuList.get(skuList.size() - 1);
        assertThat(testSku.getSkuDesc()).isEqualTo(DEFAULT_SKU_DESC);
    }

    @Test
    @Transactional
    public void createSkuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = skuRepository.findAll().size();

        // Create the Sku with an existing ID
        sku.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSkuMockMvc.perform(post("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sku)))
            .andExpect(status().isBadRequest());

        // Validate the Sku in the database
        List<Sku> skuList = skuRepository.findAll();
        assertThat(skuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSkus() throws Exception {
        // Initialize the database
        skuRepository.saveAndFlush(sku);

        // Get all the skuList
        restSkuMockMvc.perform(get("/api/skus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sku.getId().intValue())))
            .andExpect(jsonPath("$.[*].skuDesc").value(hasItem(DEFAULT_SKU_DESC.toString())));
    }

    @Test
    @Transactional
    public void getSku() throws Exception {
        // Initialize the database
        skuRepository.saveAndFlush(sku);

        // Get the sku
        restSkuMockMvc.perform(get("/api/skus/{id}", sku.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sku.getId().intValue()))
            .andExpect(jsonPath("$.skuDesc").value(DEFAULT_SKU_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSku() throws Exception {
        // Get the sku
        restSkuMockMvc.perform(get("/api/skus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSku() throws Exception {
        // Initialize the database
        skuRepository.saveAndFlush(sku);
        int databaseSizeBeforeUpdate = skuRepository.findAll().size();

        // Update the sku
        Sku updatedSku = skuRepository.findOne(sku.getId());
        // Disconnect from session so that the updates on updatedSku are not directly saved in db
        em.detach(updatedSku);
        updatedSku
            .skuDesc(UPDATED_SKU_DESC);

        restSkuMockMvc.perform(put("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSku)))
            .andExpect(status().isOk());

        // Validate the Sku in the database
        List<Sku> skuList = skuRepository.findAll();
        assertThat(skuList).hasSize(databaseSizeBeforeUpdate);
        Sku testSku = skuList.get(skuList.size() - 1);
        assertThat(testSku.getSkuDesc()).isEqualTo(UPDATED_SKU_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingSku() throws Exception {
        int databaseSizeBeforeUpdate = skuRepository.findAll().size();

        // Create the Sku

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSkuMockMvc.perform(put("/api/skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sku)))
            .andExpect(status().isCreated());

        // Validate the Sku in the database
        List<Sku> skuList = skuRepository.findAll();
        assertThat(skuList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSku() throws Exception {
        // Initialize the database
        skuRepository.saveAndFlush(sku);
        int databaseSizeBeforeDelete = skuRepository.findAll().size();

        // Get the sku
        restSkuMockMvc.perform(delete("/api/skus/{id}", sku.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sku> skuList = skuRepository.findAll();
        assertThat(skuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sku.class);
        Sku sku1 = new Sku();
        sku1.setId(1L);
        Sku sku2 = new Sku();
        sku2.setId(sku1.getId());
        assertThat(sku1).isEqualTo(sku2);
        sku2.setId(2L);
        assertThat(sku1).isNotEqualTo(sku2);
        sku1.setId(null);
        assertThat(sku1).isNotEqualTo(sku2);
    }
}
