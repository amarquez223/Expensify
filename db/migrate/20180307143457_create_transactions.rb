class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.references :type, foreign_key: true
      t.references :category, foreign_key: true
      t.date :date
      t.string :concept
      t.integer :amount

      t.timestamps
    end
  end
end
