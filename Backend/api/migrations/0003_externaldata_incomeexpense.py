# Generated by Django 5.1.5 on 2025-02-01 16:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_businessinfo_delete_userdetails'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExternalData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_loans', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('total_assets', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('liabilities', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('credit_score', models.IntegerField(blank=True, null=True)),
                ('document_processed_date', models.DateTimeField(auto_now_add=True)),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='external_data', to='api.businessinfo')),
            ],
        ),
        migrations.CreateModel(
            name='IncomeExpense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('income', models.DecimalField(decimal_places=2, max_digits=15)),
                ('expenditure', models.DecimalField(decimal_places=2, max_digits=15)),
                ('tax_paid', models.DecimalField(decimal_places=2, max_digits=15)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='financial_records', to='api.businessinfo')),
            ],
        ),
    ]
