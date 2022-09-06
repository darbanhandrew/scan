export interface StockEntryItem {
    __unsaved?:                  number;
    actual_qty?:                 number;
    additional_cost?:            number;
    against_stock_entry?:        null;
    allow_alternative_item?:     number;
    allow_zero_valuation_rate?:  number;
    amount?:                     number;
    barcode?:                    null;
    basic_amount?:               number;
    basic_rate?:                 number;
    batch_no?:                   null;
    bom_no?:                     null;
    conversion_factor?:          number;
    cost_center?:                string;
    creation?:                   string;
    description?:                string;
    docstatus?:                  number;
    doctype?:                    string;
    expense_account?:            string;
    idx?:                        number;
    image?:                      null;
    is_finished_item?:           number;
    is_process_loss?:            number;
    is_scrap_item?:              number;
    item_code?:                  string;
    item_group?:                 string;
    item_name?:                  string;
    job_card_item?:              null;
    material_request_item?:      null;
    material_request?:           null;
    modified_by?:                string;
    modified?:                   string;
    name?:                       string;
    original_item?:              null;
    owner?:                      string;
    parent?:                     string;
    parentfield?:                string;
    parenttype?:                 string;
    po_detail?:                  null;
    project?:                    null;
    putaway_rule?:               null;
    qty?:                        number;
    quality_inspection?:         null;
    reference_purchase_receipt?: null;
    retain_sample?:              number;
    s_warehouse?:                string;
    sample_quantity?:            number;
    sco_rm_detail?:              null;
    serial_no?:                  null;
    set_basic_rate_manually?:    number;
    ste_detail?:                 null;
    stock_uom?:                  string;
    subcontracted_item?:         null;
    t_warehouse?:                string;
    transfer_qty?:               number;
    transferred_qty?:            number;
    uom?:                        string;
    valuation_rate?:             number;
}