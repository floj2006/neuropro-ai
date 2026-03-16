'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/section-heading';

interface Certificate {
  id: string;
  certificateId: string;
  courseId: string;
  courseName: string;
  studentName: string;
  issuedAt: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates');
      const data = await response.json();
      if (response.ok) {
        setCertificates(data.certificates);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async (courseId: string) => {
    setGenerating(courseId);
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при создании сертификата');
      }

      fetchCertificates();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert(error instanceof Error ? error.message : 'Ошибка при создании сертификата');
    } finally {
      setGenerating(null);
    }
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Создаём простой HTML для печати
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Сертификат - ${certificate.certificateId}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
          }
          .certificate {
            background: white;
            padding: 60px;
            max-width: 800px;
            border: 20px solid #667eea;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .title {
            font-size: 48px;
            color: #667eea;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 4px;
          }
          .subtitle {
            font-size: 18px;
            color: #666;
            margin-top: 10px;
          }
          .content {
            text-align: center;
            margin: 40px 0;
          }
          .student-name {
            font-size: 36px;
            color: #333;
            border-bottom: 3px solid #667eea;
            display: inline-block;
            padding: 10px 40px;
            margin: 20px 0;
          }
          .course-name {
            font-size: 24px;
            color: #667eea;
            margin: 30px 0;
            font-weight: bold;
          }
          .description {
            font-size: 16px;
            color: #666;
            line-height: 1.8;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 60px;
            padding-top: 40px;
            border-top: 2px solid #eee;
          }
          .signature {
            text-align: center;
          }
          .signature-line {
            border-top: 2px solid #333;
            width: 200px;
            margin: 10px auto;
          }
          .certificate-id {
            font-size: 12px;
            color: #999;
            text-align: center;
            margin-top: 30px;
          }
          .date {
            font-size: 14px;
            color: #666;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .certificate {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="title">Сертификат</div>
            <div class="subtitle">NeuroPro AI Education</div>
          </div>
          
          <div class="content">
            <p class="description">Настоящим подтверждается, что</p>
            <div class="student-name">${certificate.studentName}</div>
            <p class="description">успешно завершил курс</p>
            <div class="course-name">${certificate.courseName}</div>
            <p class="description">
              ${new Date(certificate.issuedAt).toLocaleDateString('ru-RU', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div class="footer">
            <div class="signature">
              <div class="signature-line"></div>
              <p>Директор NeuroPro</p>
            </div>
            <div class="date">
              ${new Date(certificate.issuedAt).toLocaleDateString('ru-RU')}
            </div>
          </div>
          
          <div class="certificate-id">
            ID: ${certificate.certificateId}
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Документы"
          title="Мои сертификаты"
          description="Сертификаты о прохождении курсов NeuroPro"
        />

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-white">Загрузка сертификатов...</p>
          </Card>
        ) : certificates.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg text-white">У вас пока нет сертификатов</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Пройдите курсы до конца, чтобы получить сертификаты
            </p>
            <Button href="/dashboard" className="mt-6">
              К моим курсам
            </Button>
          </Card>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {certificates.map((cert) => (
              <Card key={cert.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎓</span>
                      <h3 className="text-lg font-semibold text-white">Сертификат</h3>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--muted)]">
                      {cert.courseName}
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      Выдан: {new Date(cert.issuedAt).toLocaleDateString('ru-RU')}
                    </p>
                    <p className="mt-2 text-xs font-mono text-[color:var(--neon-2)]">
                      ID: {cert.certificateId}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button 
                    onClick={() => handleDownloadCertificate(cert)}
                    className="flex-1"
                    size="sm"
                  >
                    📄 Скачать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
