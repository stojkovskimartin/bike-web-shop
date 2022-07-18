package com.example.webshop;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "hibernate_sequence", schema = "mysqlbase", catalog = "")
public class HibernateSequenceEntity {
    @Basic
    @Column(name = "next_val")
    private Long nextVal;

    public Long getNextVal() {
        return nextVal;
    }

    public void setNextVal(Long nextVal) {
        this.nextVal = nextVal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HibernateSequenceEntity that = (HibernateSequenceEntity) o;

        if (nextVal != null ? !nextVal.equals(that.nextVal) : that.nextVal != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return nextVal != null ? nextVal.hashCode() : 0;
    }
}
