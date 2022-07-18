package com.example.webshop;

import javax.persistence.*;

@Entity
@Table(name = "brand", schema = "mysqlbase", catalog = "")
public class BrandEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "brand_description")
    private String brandDescription;
    @Basic
    @Column(name = "brand_name")
    private String brandName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBrandDescription() {
        return brandDescription;
    }

    public void setBrandDescription(String brandDescription) {
        this.brandDescription = brandDescription;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BrandEntity that = (BrandEntity) o;

        if (id != that.id) return false;
        if (brandDescription != null ? !brandDescription.equals(that.brandDescription) : that.brandDescription != null)
            return false;
        if (brandName != null ? !brandName.equals(that.brandName) : that.brandName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (brandDescription != null ? brandDescription.hashCode() : 0);
        result = 31 * result + (brandName != null ? brandName.hashCode() : 0);
        return result;
    }
}
